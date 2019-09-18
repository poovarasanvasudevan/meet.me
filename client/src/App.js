import React, {Suspense, lazy} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Loading from './components/page-spinner';
import {IntlProvider} from "react-intl";
import AppContext from './module/AppContext';
import Parse from 'parse';
import SkeletonV2 from "./components/SkeletonV2";

const Dashboard = lazy(() => import('./pages/dashboard'));
const Error = lazy(() => import('./pages/500'));
const Login = lazy(() => import('./pages/login'));
const BasePage = lazy(() => import('./pages/base-page'));
const QrCode = lazy(() => import('./pages/qrcode'));
const TwoStep = lazy(() => import('./pages/two-step'));
const ForgetPassword = lazy(() => import('./pages/forget-password'));
const ResetPassword = lazy(() => import('./pages/reset-password'));
const NotFound = lazy(() => import('./pages/404'));


const PrivateRoute = ({component: Component, ...rest}) => {
    const currentUser = localStorage.getItem("loggedUser");
    return (<Route {...rest} render={(props) => (
        currentUser != null ? <Component {...props} /> : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
    )}/>);
};

const LoginRoute = ({component: Component, ...rest}) => {
    const currentUser = localStorage.getItem("loggedUser");
    return (<Route {...rest} render={(props) => (
        currentUser == null ? <Component {...props} /> : <Redirect to='/home'/>
    )}/>);
};

const logoutNow = async () => {

    try {
        Parse.User.logOut();
    } catch (e) {
        console.log(e.message);
    }
    localStorage.removeItem("loggedUser");
    localStorage.clear();

    window.location.href = '/';

};


const URLConfig = {
    avatarUrl: 'http://localhost:3001/avatar'
};

const SkeletonComponent = (props) => {

    return (
        <SkeletonV2
            containerNavigation={() => null}
            productNavigation={() => null}
            navWidth={0}
        >
            <PrivateRoute path='/home' component={Dashboard}/>
        </SkeletonV2>
    );
};


function App() {
    return (
        <AppContext.Provider value={{Parse: Parse, Logout: logoutNow, Config: URLConfig}}>
            <Suspense fallback={<Loading/>}>
                <IntlProvider locale="en">
                    <Router>
                        <Switch>
                            <LoginRoute path='/' exact component={BasePage}/>
                            <LoginRoute path='/login' component={Login}/>
                            <LoginRoute path='/qr' component={QrCode}/>
                            <LoginRoute path='/2-step' component={TwoStep}/>
                            <LoginRoute path='/forget-password' component={ForgetPassword}/>
                            <LoginRoute path='/reset-password' component={ResetPassword}/>
                            <LoginRoute path='/500' component={Error}/>


                            <Route path="/" component={SkeletonComponent}/>

                            {/*<Route*/}
                            {/*path="/kb"*/}
                            {/*render={({ match: { url } }) => (*/}
                            {/*<>*/}
                            {/*<Route path={`${url}/`} component={KBEditorPage} exact />*/}
                            {/*<Route path={`${url}/new`} component={KBEditorNewPage} />*/}
                            {/*</>*/}
                            {/*)}*/}
                            {/*/>*/}


                            <Route component={NotFound}/>
                        </Switch>
                        {/*<PrivateRoute path='/database' component={DatabasePage}/>*/}
                        {/*<PrivateRoute path='/home' component={IndexPage}/>*/}
                        {/*<PrivateRoute path='/speaker' component={SpeakerPage}/>*/}
                    </Router>
                </IntlProvider>
            </Suspense>
        </AppContext.Provider>
    );
}

export default App;
