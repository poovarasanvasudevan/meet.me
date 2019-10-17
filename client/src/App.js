import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Loading from './components/page-spinner';
import {IntlProvider} from "react-intl";
import AppContext from './module/AppContext';
import Parse from 'parse';
import SkeletonV2 from "./components/theme/skeleton/SkeletonV2";
import {loadTheme} from 'office-ui-fabric-react/lib/Styling';
import Color from './components/theme/color';

import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import Base from './components/Base'

initializeIcons(/* optional base url */);

loadTheme({
    palette: {
        themePrimary: Color.primaryColor,
        themeLighterAlt: '#eff6fc',
        themeLighter: '#deecf9',
        themeLight: '#c7e0f4',
        themeTertiary: '#71afe5',
        themeSecondary: Color.primaryColor,
        themeDarkAlt: Color.primaryColorDark,
        themeDark: Color.primaryColorDark,
        themeDarker: Color.primaryColorActive,
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#c2c2c2',
        neutralSecondary: '#858585',
        neutralPrimaryAlt: '#4b4b4b',
        neutralPrimary: '#333333',
        neutralDark: '#272727',
        black: '#1d1d1d',
        white: '#ffffff'
    },
    defaultFontStyle: {fontFamily: 'Karla, sans-serif', fontWeight: 'regular'},
    fonts: {
        small: {
            fontSize: '11px'
        },
        medium: {
            fontSize: '13px'
        },
        large: {
            fontSize: '20px',
            fontWeight: 'semibold'
        },
        xLarge: {
            fontSize: '22px',
            fontWeight: 'semibold'
        }
    }
});

const Dashboard = lazy(() => import('./pages/dashboard'));
const Notifications = lazy(() => import('./pages/notification'));


const KB = lazy(() => import('./pages/knowledgebase'));
const KBEditor = lazy(() => import('./pages/knowledgebase/editor'));


const Connect = lazy(() => import('./pages/connect'));


const Workflow = lazy(() => import('./pages/workflow'));
const WorkflowNew = lazy(() => import('./pages/workflow/new'));

const RemoteMachines = lazy(() => import('./pages/remote-machines'));


const UserManagement = lazy(() => import('./pages/user-management'));


const Error = lazy(() => import('./pages/500'));
const Login = lazy(() => import('./pages/login'));
const BasePage = lazy(() => import('./pages/base-page'));
const QrCode = lazy(() => import('./pages/qrcode'));
const TwoStep = lazy(() => import('./pages/two-step'));
const ForgetPassword = lazy(() => import('./pages/forget-password'));
const ResetPassword = lazy(() => import('./pages/reset-password'));
const NotFound = lazy(() => import('./pages/404'));
const Help = lazy(() => import('./pages/help'));
const Docs = lazy(() => import('./pages/docs'));
const Blog = lazy(() => import('./pages/blog'));
const BlogNew = lazy(() => import('./pages/blog/editor'));
const BlogPreview = lazy(() => import('./pages/blog/preview'));


const PrivateRoute = ({component: Component, ...rest}) => {
    const currentUser = localStorage.getItem("loggedUser");
    return (<Route {...rest} render={(props) => (
        currentUser != null ? <Base>
            <Component {...props} />
        </Base> : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>);
};

const LoginRoute = ({component: Component, ...rest}) => {
    const currentUser = localStorage.getItem("loggedUser");
    return (<Route {...rest} render={(props) => (
        currentUser == null ? <Component {...props} /> : <Redirect to='/home'/>
    )}/>);
};

const BaseRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            <Base><Component {...props} /></Base>
        )}/>
    );
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


function App() {
    return (
        <AppContext.Provider value={{Parse: Parse, Logout: logoutNow, Config: URLConfig}}>

            <Suspense fallback={<Loading/>}>
                <IntlProvider locale="en">
                    <Router>
                        <Switch>
                            <BaseRoute path='/' exact component={BasePage}/>
                            <LoginRoute path='/login' component={Login}/>
                            <LoginRoute path='/qr' component={QrCode}/>
                            <LoginRoute path='/2-step' component={TwoStep}/>
                            <LoginRoute path='/forget-password' component={ForgetPassword}/>
                            <LoginRoute path='/reset-password' component={ResetPassword}/>
                            <LoginRoute path='/500' component={Error}/>


                            <BaseRoute path='/help' component={Help}/>
                            <BaseRoute path='/docs' component={Docs}/>


                            <PrivateRoute path='/home' component={Dashboard}/>
                            <PrivateRoute path='/notifications' component={Notifications}/>


                            <PrivateRoute exact path='/kb' component={KB}/>
                            <PrivateRoute path='/kb/editor' component={KBEditor}/>


                            <PrivateRoute path='/connect' component={Connect}/>


                            <PrivateRoute path='/blog' exact component={Blog}/>
                            <PrivateRoute path='/blog/new' exact component={BlogNew}/>
                            <PrivateRoute path='/blog/edit/:kb' exact component={BlogNew}/>


                            <PrivateRoute path='/workflow' exact component={Workflow}/>
                            <PrivateRoute path='/workflow/new' exact component={WorkflowNew}/>


                            <PrivateRoute path='/remote' exact component={RemoteMachines}/>


                            <PrivateRoute path='/user-manage' exact component={UserManagement}/>


                            <BaseRoute path='/blog/preview/:kb' component={BlogPreview}/>

                            <BaseRoute component={NotFound}/>
                        </Switch>
                    </Router>
                </IntlProvider>
            </Suspense>
        </AppContext.Provider>
    );
}

export default App;
