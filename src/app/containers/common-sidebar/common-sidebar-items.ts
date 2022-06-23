export interface INavAttributes {
  [propName: string]: any;
}
export interface INavWrapper {
  attributes: INavAttributes;
  element: string;
}
export interface INavBadge {
  text: string;
  variant: string;
  class?: string;
}
export interface INavLabel {
  class?: string;
  variant: string;
}
export interface INavLinkProps {
  queryParams?: {
      [k: string]: any;
  };
  fragment?: string;
  queryParamsHandling?: 'merge' | 'preserve' | '';
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {
      [k: string]: any;
  };
  routerLinkActiveOptions?: {
      exact: boolean;
  };
  routerLinkActive?: string | string[];
}
export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  permission?: any[];
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
}

export const navItems: INavData[] = [

  {
    title: true,
    name: 'Main Menu',
    permission: [''],
  },
  {
    name: 'Dashboard',
    url: '/landing/home',
    icon: 'fa fa-home',
    // permission: [''],
  },
  {
    name: 'Positions',
    url: '',
    icon: 'fa fa-rocket',
    // permission: [''],
    children: [
      {
        name: 'My Positions',
        url: '/candidate/positions',
        icon: 'fa fa-angle-double-right',
        permission: ['CANDIDATE']
      },
      {
        name: 'Applicantions',
        url: '/candidate/applications',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
     
    ]

  },
  {
    name: 'Reports',
    url: '',
    icon: 'fa fa-book',
    permission: ['JUNIOR_OFFICER','INTERNAL_EVALUATOR','LEAD_INNOVATION_MANAGER','SUBJECT_MATTER_EVALUATOR', 'EXTERNAL_EVALUATOR','CHIEF_EVALUATOR'],
    children: [
      {
        name: 'Submissions',
        url: '/reports/analytics',
        icon: 'fa fa-angle-double-right',
        // permission: ['INNOVATOR']
      }
    ]
  },
  {
    name: 'Notes',
    url: '/notes/list',
    icon: 'fa fa-book',
    permission: ['JUNIOR_OFFICER','INTERNAL_EVALUATOR','INNOVATION_MANAGER','LEAD_INNOVATION_MANAGER','SUBJECT_MATTER_EVALUATOR', 'EXTERNAL_EVALUATOR','CHIEF_EVALUATOR'],
  },
  {
    name: 'Assignments',
    url: '',
    icon: 'fa fa-file-o',
    permission: ['INNOVATOR','LEAD_INTERNAL_EVALUATOR'],
    children: [
      {
        name: 'My Assignments',
        url: '/my-assignments/list',
        icon: 'fa fa-angle-double-right',
        permission: ['INNOVATOR']
      },
      {
        name: 'Assignments List',
        url: '/assignments/list',
        icon: 'fa fa-angle-double-right',
        permission: ['EVALUATOR', 'LEAD_INNOVATION_MANAGER', 'LEAD_INTERNAL_EVALUATOR','CHIEF_EVALUATOR']
      }
    ]
  },
  // {
  //   name: 'Analytics',
  //   url: '/analytics',
  //   icon: 'fa fa-bar-chart',
  //   permission: ['LEAD_INNOVATION_MANAGER','USER_MANAGER'],
  // },
  {
    name: 'User Management',
    url: '/administration/staff-registration',
    icon: 'fa fa-users',
    permission: ['USER_MANAGER', 'TEAM_LEADER', ],
    children: [
      {
        name: 'Staff Listing',
        url: '/administration/staff-listing',
        icon: 'fa fa-users',
        permission: ['USER_MANAGER', 'TEAM_LEADER', 'ICT_SUPPORT']
      },
      {
        name: 'New Staff',
        url: '/administration/staff-registration',
        icon: 'fa fa-user-plus',
        permission: ['USER_MANAGER']
      }
    ]



  },
  
  
 


  // {
  //   name: 'Profile',
  //   url: '/profile',
  //   icon: 'fa fa-street-view',
  //   permission: []
  // }




  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
