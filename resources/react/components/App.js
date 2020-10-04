import React, { useContext } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const App = () => {
    /** transition between routes */
    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, position: 'absolute' },
        enter: { opacity: 1 },
        update: { opacity: 1 },
        leave: { opacity: 0 },
        // config: config.molasses,
        config: { duration: 300 }
    });

    return (<>
        {transitions.map(({ item: location, props, key }) => (
            <animated.div key={key} style={{ ...props, width: '100%', height: '100%' }}>
                <div className="App">
                    <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </animated.div>
        ))}
    </>);
}

export default App;