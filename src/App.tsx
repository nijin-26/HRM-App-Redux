import GlobalStyle from './globalStyles.ts';
import { AppContextProvider } from './core/contexts/AppContext.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './core/routes/router.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <AppContextProvider>
                <GlobalStyle />
                <RouterProvider router={router} />
            </AppContextProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default App;
