import { useCheckAdminQuery } from "@/redux/slices/auth/authApiSlice";

const useCheckAdmin = () => {
  const { data, isLoading, refetch } = useCheckAdminQuery(undefined, {
    skip: false, // Không bỏ qua query
    refetchOnMountOrArgChange: true, // Buộc refetch khi component mount lại
  });

  return { data, isLoading, refetch };
};
