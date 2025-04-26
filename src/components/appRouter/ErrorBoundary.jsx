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
            <div className="fixed inset-8 p-2 bg-background rounded-2xl shadow shadow-destructive">
                <div>
                    <h1>Application Error!</h1>
                    <p>The application encountered a critical error and could not continue.</p>
                    {isDevMode && errorInfo?.componentStack && (
                        <div className="py-2">
                            <strong>Error Details</strong>
                            <div className="rounded p-2">
                                <div className="text-destructive pb-4">{error?.toString()}</div>
                                <details open>
                                    <summary>
                                        <strong>Stack trace:</strong>
                                    </summary>
                                    <pre className="text-sm overflow-auto">
                                        {errorInfo.componentStack}
                                    </pre>
                                </details>
                            </div>
                        </div>
                    )}
                    <button onClick={this.resetErrorBoundary}>Try Again</button>
                </div>
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
