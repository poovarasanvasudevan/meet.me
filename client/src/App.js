import React, {Suspense, lazy} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Loading from './components/page-spinner';
import {IntlProvider} from "react-intl";
import AppContext from './module/AppContext';
import Parse from 'parse';


const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));


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
function App() {
    return (
        <AppContext.Provider value={{Parse: Parse,Logout: logoutNow}}>
            <Suspense fallback={<Loading/>}>
                <IntlProvider locale="en">
                    <Router>
                        <LoginRoute path='/' exact component={Login}/>
                        <PrivateRoute path='/home' component={Dashboard}/>

                        {/*<Route*/}
                        {/*path="/kb"*/}
                        {/*render={({ match: { url } }) => (*/}
                        {/*<>*/}
                        {/*<Route path={`${url}/`} component={KBEditorPage} exact />*/}
                        {/*<Route path={`${url}/new`} component={KBEditorNewPage} />*/}
                        {/*</>*/}
                        {/*)}*/}
                        {/*/>*/}


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
