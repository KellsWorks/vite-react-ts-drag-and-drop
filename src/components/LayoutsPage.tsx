import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchData, selectors } from '../app/reducer';
import Layout from './Layout';

const LayoutsPage = () => {
  const dispatch = useAppDispatch();
  const views = useAppSelector(selectors.getViews);

  const fetch = useCallback(() => dispatch(fetchData()), [dispatch]);

  useEffect(() => {
    /* TODO: remove condition when we will save the data on server */
    if (!views.length) {
      fetch();
    }
  }, [fetch, views.length]);

  return (
    <div>
      <div className="row mb-4 pb-2 border-bottom justify-content-between">
        <h4 className="col p-0">
          Layout Screen
        </h4>
        <div className="col-3 text-end p-0">
          <button className="btn" onClick={fetch}>Reset Changes (Also from local storage)</button>
        </div>
      </div>
      <div className="row">
        {views.map(view => <Layout key={view.id} view={view} />)}
      </div>
    </div>
  )
};

export default LayoutsPage;
