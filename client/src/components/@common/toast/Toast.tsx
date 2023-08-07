import { Toaster } from 'react-hot-toast';

function Toast() {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      containerStyle={{
        left: 40,
        bottom: 40,
      }}
      toastOptions={{
        className: '',
        style: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}

export default Toast;
