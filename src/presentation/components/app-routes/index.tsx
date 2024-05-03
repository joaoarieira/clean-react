import { NotFound } from '@/presentation/pages/not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/presentation/styles/global.module.scss';
import { makeLogin } from '@/main/factories/pages/login/login-factory.tsx';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={makeLogin()} />

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
