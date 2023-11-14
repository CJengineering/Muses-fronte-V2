// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'Dashboard',
          path: '/dashboards/dashboard',
          icon: 'material-symbols:dashboard-outline',
        },
        {
          title: 'Content',
          path: '/dashboards/content',
          icon: 'fluent:content-view-32-regular',
        },
        {
          title: 'Keywords',
          path: '/dashboards/keywords',
          icon: 'iconoir:brain',
        },
      ],
    },
  ];
};

export default navigation;
