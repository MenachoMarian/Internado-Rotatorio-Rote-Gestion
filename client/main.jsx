import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { Rutas } from '../imports/routes/routes';

import 'bootstrap/dist/css/bootstrap.css';

import '../imports/routes/routes'

Meteor.startup(() => {
  render(<Rutas />, document.getElementById('react-target'));
});
