import React from 'react';
import Header from '../Header';
import CreateBlog from './createNew';
import BlogList from './blogList';

function Blogs(props) {
    return (
        <React.Fragment>
            <Header />
            <div style={{ marginTop: '5rem' }}>
                <BlogList history={props.history} />
            </div>
        </React.Fragment>
    )
}

export default Blogs;