import { Login } from '@/presentation/pages';
import { NotFound } from '@/presentation/pages/not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/presentation/styles/global.module.scss';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Login validation={{} as never} authentication={{} as never} />
            }
          />

          {/* 
          <Route path="route/">
            <Route index element={<Element />} />
            <Route path=":id/children" element={<Children />} />
          </Route>
          */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
