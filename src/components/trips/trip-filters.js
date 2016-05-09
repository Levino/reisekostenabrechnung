import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';


export function TripFilters({filter}) {
  return (
    <ul className="trip-filters">
      <li><Link className={classNames({active: !filter})} to="/trips">View All</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/trips', query: {filter: 'active'}}}>Active</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/trips', query: {filter: 'completed'}}}>Completed</Link></li>
    </ul>
  );
}

TripFilters.propTypes = {
  filter: PropTypes.string
};
