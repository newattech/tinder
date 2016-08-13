import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { fetchMatches } from 'containers/Dashboard/actions';
import { detailPerson, superLikePerson, likePerson, passPerson } from './actions';
import { selectMatches, selectCurrentMatch, selectCurrentMatchLinks } from './selectors';
import { selectTargetGender, selectFetching } from 'containers/Dashboard/selectors';
import styles from './styles.css';

import DetailView from 'components/DetailView';
import MatchCard from 'components/MatchCard';
import Button from 'components/Button';
import Panel from 'components/Panel';
import Waypoint from 'react-waypoint';
import { throttle } from 'lodash';

class DashboardMatches extends React.Component { // eslint-disable-line
  mapMatches() {
    return this.props.matches && this.props.matches.map((each) => <MatchCard key={each._id} data={each} onClick={this.props.onClickCard} onClickButton={this.props.onClickButton} />);
  }

  handleWaypoint(scroll) {
    console.log(scroll);
    if (!this.props.isFetching) this.props.fetchMatches();
  }

  render() {
    const matches = (this.props && this.props.matches) ? this.mapMatches() : null;
    return (
      <div className={styles.dashboardMatchesContainer}>
        <div className={styles.dashboardMatchesCards}>
          <div className={styles.dashboardMatchesNavigation}>
            <select>
              <option value="normal">Normal</option>
              <option value="active">Recently Active</option>
              <option value="nearby">Nearby</option>
            </select>
            <div>
              <Button type="fetchMatches" onClick={() => this.props.onMultiple(this.props.matches, 'like')}>Like All</Button>
              <Button type="fetchMatches" onClick={() => this.props.onMultiple(this.props.matches, 'pass')}>Pass All</Button>
            </div>
          </div>
          <div ref={(thisComponent) => { this.scrollContainer = thisComponent; }} className={styles.dashboardMatchesCardsContainer}>
            {matches}
            <Waypoint scrollableAncestor={this.scrollContainer} onEnter={(props) => this.handleWaypoint(props)} />
          </div>
        </div>
        <div className={styles.dashboardMatchesDetails}>
        {this.props.matchDetail && this.props.matchDetailImages ?
          <DetailView
            data={this.props.matchDetail}
            imageData={this.props.matchDetailImages}
            onClickButton={this.props.onClickButton}
            targetGender={this.props.targetGender}
          /> : <Panel type="matchDetailPlaceholder" targetGender={this.props.targetGender} />}
        </div>
      </div>
    );
  }
}

DashboardMatches.propTypes = {
  matches: PropTypes.array.isRequired,
  matchDetail: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
  ]),
  matchDetailImages: PropTypes.array,
  onClickCard: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
  onMultiple: PropTypes.func.isRequired,
  fetchMatches: PropTypes.func.isRequired,
  targetGender: PropTypes.number.isRequired,
  isFetching: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  matches: selectMatches(),
  matchDetail: selectCurrentMatch(),
  matchDetailImages: selectCurrentMatchLinks(),
  targetGender: selectTargetGender(),
  isFetching: selectFetching(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMatches: () => dispatch(fetchMatches()),
    onMultiple: (matches, type) => {
      matches.map((each) => {
        if (type === 'like') return dispatch(likePerson(each._id));
        if (type === 'pass') return dispatch(passPerson(each._id));
        return null;
      });
    },
    onClickCard: (id, image) => {
      dispatch(detailPerson(id, image));
    },
    onClickButton: (id, type) => {
      if (type === 'like') dispatch(likePerson(id));
      if (type === 'pass') dispatch(passPerson(id));
      if (type === 'superlike') dispatch(superLikePerson(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(DashboardMatches));