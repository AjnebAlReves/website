import React from "react";

interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => (
	<div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 text-sm">
		<strong>ERROR</strong>
		<div>Hubo un error durante la compilación del código</div>
		<pre className="whitespace-pre-wrap text-xs mt-2">{error.message}</pre>
		{error.stack && (
			<details className="mt-2">
				<summary>Stack Trace</summary>
				<pre className="whitespace-pre-wrap text-xs">{error.stack}</pre>
			</details>
		)}
		{/* Aquí puedes agregar links útiles si lo deseas */}
		<div className="mt-2 flex gap-2">
			<a
				href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
				target="_blank"
				rel="noopener noreferrer"
				className="underline"
			>
				React Error Boundaries
			</a>
			<a
				href="https://stackoverflow.com/search?q=react+error+boundary"
				target="_blank"
				rel="noopener noreferrer"
				className="underline"
			>
				Stack Overflow
			</a>
		</div>
	</div>
);

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch() {
		// Puedes loguear el error aquí si lo deseas
		// console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError && this.state.error) {
			return this.props.fallback || <ErrorFallback error={this.state.error} />;
		}
		return this.props.children;
	}
}
