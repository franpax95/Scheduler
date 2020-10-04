import React, { useContext } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';
import styled from 'styled-components';

import Navbar from '../components/Navbar';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

/** styled-components */
const SpringWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const AnimatedSpringWrapper = animated(SpringWrapper);

/**
 * main
 */
const App = () => {
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
        <Navbar />
        {transitions.map(({ item: location, props, key }) => (
            <AnimatedSpringWrapper key={key} style={props}>
                <div className="App">
                    <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </AnimatedSpringWrapper>
        ))}
    </>);
}

export default App;