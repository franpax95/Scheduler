import React, { useContext } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';
import styled from 'styled-components';

import { Context as UserContext } from '../contexts/UserContext';

import Navbar from '../components/Navbar';

import Login from '../pages/Login';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

/** styled-components */
const SpringWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`;
const AnimatedSpringWrapper = animated(SpringWrapper);

/** renderprops AuthRoute */
const AuthRoute = ({ path, component, isAuth = false }) => 
    isAuth
        ? <Route exact path={path} component={component} />
        : <Redirect to="/login" />

/**
 * main
 */
const App = () => {
    /** user state */
    const { isAuth, user, getUserDetails } = useContext(UserContext);

    /** transition between routes */
    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        update: { opacity: 1 },
        leave: { opacity: 0 },
        // config: config.molasses,
        config: { duration: 300 }
    });

    return (<>
        {isAuth && <Navbar />}
        
        {transitions.map(({ item: location, props, key }) => (
            <AnimatedSpringWrapper key={key} style={props}>
                <div className="App">
                    <Switch location={location}>
                        <Route exact path="/login" component={Login} />

                        <AuthRoute exact path="/" component={Home} isAuth={isAuth} />
                        <AuthRoute component={NotFound} isAuth={isAuth} />
                    </Switch>
                </div>
            </AnimatedSpringWrapper>
        ))}
    </>);
}

export default App;