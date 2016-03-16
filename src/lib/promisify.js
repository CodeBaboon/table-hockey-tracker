import Q from 'q';

export const { promisify } = {
	promisify: (req) => req.promise = () => {
		const deferred = Q.defer();
		req.end(function(err, res) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(res);
			}
		});
		return deferred.promise;
	}
};
