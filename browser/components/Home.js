import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import MonthGrouping from './MonthGrouping';
import YearGrouping from './YearGrouping';
import FilterButtons from './FilterButtons';
import PleaseAddBooks from '../messages/PleaseAddBooks';
import NoBooksFound from '../messages/NoBooksFound';
import PleaseSignUp from '../messages/PleaseSignUp';
import { getVisibleBooks } from '../utilities';
import { HAVE_READ, TO_READ, BY_YEAR, BY_MONTH, FAVORITES, QUERIED } from '../reducers/visibilityFilterReducer';

const Home = ({ books, queriedBooks, user, visibilityFilter }) => {
    if (!user.id){
       return ( <PleaseSignUp /> );
    } else if (visibilityFilter === QUERIED) {
        return (
        <div>
            <FilterButtons />
            {queriedBooks.length ? <Books title="Search Results:" books={queriedBooks} /> : <NoBooksFound /> }
        </div>
        );
    } else if (!books.length){
        return (
            <div>
                <FilterButtons />
                <PleaseAddBooks title={visibilityFilter} />
            </div>
        );
    } else if (visibilityFilter === TO_READ) {
        return (
            <div>
                <FilterButtons />
                <Books title="Books To Read:" books={books} />
            </div>
        );
    } else if (visibilityFilter === BY_MONTH) {
        return (
        <div>
            <FilterButtons />
            <MonthGrouping books={books} />
        </div>
        );
    } else if (visibilityFilter === BY_YEAR){
        return (
        <div>
            <FilterButtons />
            <YearGrouping books={books} />
        </div>
        );
    } else if (visibilityFilter === FAVORITES) {
        return (
        <div>
            <FilterButtons />
            <Books title="Your Favorited Books:" books={books} />
        </div>
        );
    } else if (visibilityFilter === HAVE_READ) {
        return (
        <div>
            <FilterButtons />
            <Books title="Books You've Read:" books={books} />
        </div>
        );
    }
};

const mapStateToProps = ({ books, user, queriedBooks, visibilityFilter }) => {
    return {
        books: getVisibleBooks(books, visibilityFilter),
        queriedBooks,
        user,
        visibilityFilter,
    };
};

export default connect(mapStateToProps)(Home);
