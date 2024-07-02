export const handleError = (e, setter, setError, regex) => {
    setter(e.target.value);
    const error = !regex.test(e.target.value);
    setError(error);
  };