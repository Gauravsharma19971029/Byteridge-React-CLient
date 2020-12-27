import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components/private-route";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { AuditPage } from "../Audit Page";
import { Header } from "../_components/_header";

class App extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert, user } = this.props;
    return (
      <Router history={history}>
        <div>
          <Header />
          <div className="jumbotron">
            <div className="container-fluid">
              <div className="col-sm-8 col-sm-offset-2">
                {alert.message && (
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
                )}

                <div>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute exact path="/audit" component={AuditPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

function mapState(state) {
  const { alert, authentication } = state;
  const { user } = authentication;
  return { alert, user };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
