import { useNavigate } from "react-router-dom";

const WithRouter = (WrappedComponent: any) => {
  const WithRouterComponent = (props: any) => {
    const navigate = useNavigate();
    return <WrappedComponent navigate={navigate} {...props} />;
  };

  return WithRouterComponent;
};

export default WithRouter;
