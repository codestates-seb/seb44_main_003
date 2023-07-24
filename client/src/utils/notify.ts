import toast from 'react-hot-toast';

export const notifyError = (notify: string) => toast.error(`${notify}`);
export const notifySuccess = (notify: string) => toast.success(`${notify}`);
export const notifyWithIcon = (notify: string, icon: string) =>
  toast(`${notify}`, {
    icon: `${icon}`,
  });
