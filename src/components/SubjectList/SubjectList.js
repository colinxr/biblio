import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubjectList extends Component {
  render() {
    const { subjects, filterSubject, clearFilter } = {...this.props};

    return (
      <ul className="subject-list">
        <li>Filter by:</li>
        {
          subjects.map((subject, key) => <li
              className="subject-list__option"
              key={key}
              index={subject.id}
              onClick={() => filterSubject(key)} >
              {subject.name}
            </li>
          )
        }
        <li className="subject-list__option"
          onClick={() => clearFilter()}>Clear</li>
      </ul>
    )
  }
}

SubjectList.propTypes = {
  subjects: PropTypes.array.isRequired,
  filterSubject: PropTypes.func.isRequired,
}

export default SubjectList;
