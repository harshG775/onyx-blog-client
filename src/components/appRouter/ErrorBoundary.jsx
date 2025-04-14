import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError() {
        // Update state to show fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.logError(error, errorInfo);
        this.setState({ error, errorInfo });
    }

    logError = (error, errorInfo) => {
        // Replace with your actual error logging service
        console.error("Error caught by ErrorBoundary:", error);
        console.error("Error Info:", errorInfo.componentStack);
    };

    resetErrorBoundary = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    renderFallbackUI = () => {
        const { fallback } = this.props;
        const { error, errorInfo } = this.state;
        const isDevMode = import.meta.env.MODE === "development";
        if (fallback) {
            return typeof fallback === "function"
                ? fallback({
                      error,
                      resetErrorBoundary: this.resetErrorBoundary,
                  })
                : fallback;
        }

        return (
            <div>
                <h1>Unexpected Application Error!</h1>
                {isDevMode && errorInfo?.componentStack && (
                    <details>
                        <summary>Error Details</summary>
                        <pre>
                            <strong>Error Message:</strong> {error?.toString()}
                            {"\n"}
                            <strong>Component Stack:</strong>
                            {"\n"}
                            {errorInfo.componentStack}
                        </pre>
                    </details>
                )}
                <button onClick={this.resetErrorBoundary}>Try Again</button>
            </div>
        );
    };

    render() {
        if (this.state.hasError) {
            return this.renderFallbackUI();
        }

        return this.props.children;
    }
}
