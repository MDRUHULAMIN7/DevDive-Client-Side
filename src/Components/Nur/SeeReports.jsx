import UseAllReports from "../../Hooks/Nur/UseAllReports";

const SeeReports = () => {
  const { data } = UseAllReports();

  return <div>this is report page. Total reports {data?.length}</div>;
};

export default SeeReports;
