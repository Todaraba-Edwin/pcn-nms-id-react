import * as RD from 'react-router-dom';
import * as P from '@/1_pages';

export const RouterTemplate = () => {
  return (
    <RD.BrowserRouter>
      <RD.Routes>
        <RD.Route path="/" element={<P.OpenLayersPage />} />
        <RD.Route path="/login" element={<P.LoginPage />} />
      </RD.Routes>
    </RD.BrowserRouter>
  );
};
