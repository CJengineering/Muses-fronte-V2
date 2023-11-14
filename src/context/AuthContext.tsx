// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { id } from 'date-fns/locale'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

 {/* useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])*/} 
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem('userData')!
      if (storedToken) {
        setLoading(false)
        console.log('the stored token',storedToken)
        const userData: UserDataType = {
          id: 2,
          // ... populate other fields as necessary from resource_owner or defaults
          role: 'admin', // Replace with actual role if available
          email: "params.email", // using the email from params since it's not in the response
          fullName: 'Default Name', // Replace with actual name if available
          username: 'default_username', // Replace with actual username if available
          password: '', // It's unusual to store password in local state, consider removing
          avatar: null // Replace with actual avatar if available
        };
        setUser(userData)
      } else {
       console.log('no token found')
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
   
        setUser({ ...response.data.userData })
        window.localStorage.setItem('the response data login 1',JSON.stringify(response.data))
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }
  const handleLogin2 = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true); 
    try {
     
      const response = await axios.post('https://new-alerts-e4f6j5kdsq-ew.a.run.app/users/tokens/sign_in', {
        email: params.email,
        password: params.password
      });
      const { token, refresh_token, resource_owner } = response.data;
      
      const idMappings: { [key: string]: { fullName: string; role: string; username: string } } = {
        "1": { fullName: 'Nat Daudrich', role: 'admin', username: 'Nat' },
        "2": { fullName: 'Tim Spiridonov', role: 'admin', username: 'Tim' },
        "3": { fullName: 'Sabrina Gilby', role: 'admin', username: 'Sabrina' },
        "4": { fullName: 'Melissa Howell', role: 'admin', username: 'Melissa' },
        "5": { fullName: 'Nader Dhiab', role: 'admin', username: 'Nader' }
      };
  
      // Extracting user-specific data from the mapping object based on id
      const userSpecificData = idMappings[resource_owner.id] || { fullName: '', role: '', username: '' };
  
      // Assuming the setUser expects an object of type UserDataType
      const userData: UserDataType = {
        id: resource_owner.id,
        role: userSpecificData.role,
        fullName: userSpecificData.fullName,
        username: userSpecificData.username,
        email: params.email, // using the email from params since it's not in the response
        password: '', // It's unusual to store the password in local state, consider removing
        avatar: null // Replace with actual avatar if available
      };
      setUser(userData);
  

      window.localStorage.setItem('the response data login 2',JSON.stringify(response.data))
      if (params.rememberMe) {
        window.localStorage.setItem(authConfig.storageTokenKeyName, token);
        window.localStorage.setItem('refreshToken', refresh_token); // Store refresh token if needed
        window.localStorage.setItem('userData', JSON.stringify(userData)); // Storing only id for now
      }
  

      setLoading(false);
  
      // Redirect logic (make sure this is after the user state is set)
      const returnUrl = router.query.returnUrl || '/dashboards/content';
      await router.replace(returnUrl as string);
      
    } catch (err) {
      // Stop loading state in case of error
      setLoading(false);
  
      if (errorCallback) {
        console.log('something went wrong')
      }
      // Handle additional error logic here if necessary
    }
  };
  

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin2,
    logout: handleLogout
  }
 console.log('the values in auth context',values  )
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
