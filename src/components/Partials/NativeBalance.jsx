import { n4 } from "../../helpers/formatters";
import { useNativeBalance } from "../../hooks/useNativeBalance";

function NativeBalance(props) {
  const { balance, nativeName } = useNativeBalance(props);

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>{`${n4.format(
      balance.formatted
    )} ${nativeName}`}</div>
  );
}

export default NativeBalance;
