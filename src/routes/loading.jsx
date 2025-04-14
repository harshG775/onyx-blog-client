export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-200"></div>
            </div>
        </div>
    );
}
