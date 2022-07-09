import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import routes from '../../routes';
import "./style.css";

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const BreadcrumbsItem = (props) => {
  const routeName = findRouteName(props.url);
  if (routeName) {
    return (
      props.isExact ?
        (
          <BreadcrumbItem active>{routeName}</BreadcrumbItem>
        ) :
        (
          <BreadcrumbItem>
            <Link to={props.url || ''}>
              {routeName}
            </Link>
          </BreadcrumbItem>
        )
    );
  }
  return null;
};

const Breadcrumbs = (props) => {
  let pathname=window.location.hash.substring(1);
  const paths = getPaths(pathname);
  const items = paths.map((path, i) => <BreadcrumbsItem key={i++} url={path} isExact={true} />);
  return (
    <Breadcrumb className="breadcrumbs">
      {items}
    </Breadcrumb>
  );
};

export default props => (
  <div>
    <Breadcrumbs {...props} />
  </div>
);
