import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 text-center">
          <div>
            <p className="text-2xl font-semibold mb-2">Something went wrong</p>
            <p className="text-neutral-500 mb-4">{this.state.error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary rounded-full"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
