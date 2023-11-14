import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from 'react';
import { AppDispatch, RootState } from "src/store";


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useUpdateArchive = () => {
    const updateArchive = async (id :number) => {
      const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`;
      const body = JSON.stringify({ category_label: 'archived' });

      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });

        if (!response.ok) {
          throw new Error('Failed to update archive');
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    return { updateArchive }; 
  };

  export const useUpdateShortlist = () => {
    const updateShortlist = async (id :number) => {
      const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`;
      const body = JSON.stringify({ category_label: 'shortlist' });
  
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });
  
        if (!response.ok) {
          throw new Error('Failed to update archive');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return { updateShortlist }; 
  };

  export const useAnalyzer = ()=>{
    const handleAnalyser = async (id: number) => {
      
        const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/analyzer_new?id=${id}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
          }
        } catch (error) {
          console.error(error);
        } 
      };
      return {handleAnalyser}
  }

  export const useWebflow= ()=>{
    const handleWebflow = async (link: string, id:number) => {
     
        const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/article_creator?link=${link}&id=${id}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status == 204) {
          
          }
        } catch (error) {
          console.error(error);
        } finally {
       
        }
      };
      return {handleWebflow}
    }
  export const useSlack = ()=>{
    const sendSlackMessage = async (keyword: string, link: string) => {
      try {
        const response = await fetch(
          'https://hermes-e4f6j5kdsq-ew.a.run.app/static/article_slack',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword, link }),
          }
        );
  
        if (response.ok) {
          console.log('Keyword and link sent successfully:', keyword, link);
        } else {
          console.error('Failed to send keyword and link:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending keyword and link:', error);
      }
    };
    return {sendSlackMessage}
  }
  export const useTokenRevoker = () => {

    const revokeToken = async (accessToken: string) => {
      try {
        const response = await fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/users/tokens/revoke', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
  
        if (response.ok) {
          console.log('Token revoked successfully.');
        } else {
          console.error('Error revoking token:', response.statusText);
        }
      } catch (error) {
        console.error('Error revoking token:', error);
      }
    };
  
    const clearLocalStorage = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('id');
      console.log('Local storage cleared.');
    };
  
    const reloadPage = () => {
      window.location.reload();
    };
  
    const handleTokenRevocation = async (accessToken: string) => {
      await revokeToken(accessToken);
      clearLocalStorage();
      reloadPage();
    };
  
    return { handleTokenRevocation };
  };