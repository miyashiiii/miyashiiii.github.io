export const useLoading = () => {
  const isLoadingPage = useState<boolean>("isLoading", () => true);
  const update = (isLoading: boolean) => {
    isLoadingPage.value = isLoading;
  };
  return {
    isLoading: readonly(isLoadingPage),
    update,
  };
};
