import React, { useCallback, useMemo, useState } from 'react';
import { Pencil } from 'react-bootstrap-icons';
import { Responsive, WidthProvider } from "react-grid-layout";
import { Link } from 'react-router-dom';
import { LayoutView } from '../types';
import LayoutItem from './LayoutItem';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const rowHeights: { [key: string]: number } = { lg: 5, md: 3, sm: 2, xs: 1 };
const cols = { lg: 24, md: 24, sm: 24, xs: 24 };
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 };

interface Props {
  view: LayoutView;
}

const Layout: React.FC<Props> = ({ view }) => {
  const staticView = useMemo(() => view.componentLayout.map(layout => ({ ...layout, static: true })), [view.componentLayout]);

  const [height, setHeight] = useState(rowHeights.lg);

  const onBreakpointChange = useCallback((newBreakpoint: string) => {
    setHeight(rowHeights[newBreakpoint])
  }, [setHeight]);

  return (
    <div className="col-sm-6 col-lg-4 pb-5">
      <div className="card h-100">
        <div className="card-header d-flex justify-content-between align-items-center">
          {view.name}
          <Link className="btn" to={{ pathname: `/configuration/${view.id}` }}>
            <Pencil />
          </Link>
        </div>
        <div className="card-body overflow-auto layout-card">
          <ResponsiveReactGridLayout
            className="layout border"
            cols={cols}
            layouts={{ lg: staticView }}
            breakpoints={breakpoints}
            rowHeight={height}
            onBreakpointChange={onBreakpointChange}
            measureBeforeMount={false}
          >
            {
              staticView.map(componentLayout => (
                <div key={componentLayout.i} className="static card overflow-hidden bg-light justify-content-center align-items-center">
                  <LayoutItem componentLayout={componentLayout} />
                </div>
              ))
            }
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </div>
  )
};

export default Layout;
