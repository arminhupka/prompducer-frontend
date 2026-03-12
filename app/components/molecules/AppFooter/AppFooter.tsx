const AppFooter = () => {
	return (
		<footer className="border-t py-8 bg-card">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
					<div className="col-span-1 space-y-2">
						<h4 className="text-semibold text-xl font-semibold">
							{import.meta.env.VITE_APP_NAME}
						</h4>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default AppFooter;
