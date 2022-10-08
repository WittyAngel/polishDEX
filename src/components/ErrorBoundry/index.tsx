import React, { ReactNode } from "react";
import Error from "./Error";

class ErrorBoundary extends React.Component {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <Error/>
      );
    }

    const {children} = this.props; /* eslint-disable-line react/prop-types */

    return children;
  }
}

export default ErrorBoundary;
