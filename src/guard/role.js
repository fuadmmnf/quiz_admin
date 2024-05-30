import {useStore} from "stores/store";
const store = useStore();
export const rolesPermissions = {
  'admin': {
    restrictedRoutes: ['*'],
    restrictedSubRoutes: {
    },
    actionPermissions: ['*']
  },
  'subadmin': {
    restrictedRoutes: [],
    restrictedSubRoutes: {
      'roles': ['subadmin'],
    },
    actionPermissions: ['enroll-student']

  },
  'moderator': {
    restrictedRoutes: ['roles', 'resources'],
    restrictedSubRoutes: {},
    actionPermissions: []
  },
  'mentor': {
    restrictedRoutes: ['roles', 'resources'],
    restrictedSubRoutes: {},
    actionPermissions: []
  },
};

export function isNavLinkAllowed(link) {
  const userRole = store.getUserRole;
  if (userRole === 'admin') return true;
  return rolesPermissions[store.getUserRole] && !rolesPermissions[store.getUserRole].restrictedRoutes.includes(link);
}

export function isSubNavLinkAllowed(mainLink, subLink) {
  const userRole = store.getUserRole;
  if (userRole === 'admin') return true;
  const rolePermissions = rolesPermissions[userRole];
  if (!rolePermissions) {
    return false;
  }
  const subNavLinks = rolePermissions.restrictedSubRoutes[mainLink];
  if (!subNavLinks) {
    return true;
  }
  return !subNavLinks.includes(subLink);
}

export function isActionAllowed(action) {
  const userRole = store.getUserRole;
  if (userRole === 'admin') return true;
  const rolePermissions = rolesPermissions[userRole];
  return rolePermissions && rolePermissions.actionPermissions.includes(action);
}

