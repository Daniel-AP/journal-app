import { useSelector } from "react-redux"
import { types } from "../store/auth/types";

export const useIsLoading = () => {

    const authStatus = useSelector(state => state.auth.status);
    const journalStatus = useSelector(state => state.journal.isFetching);

    return authStatus === types.checking || journalStatus;

}
