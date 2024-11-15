import {ActionCreators} from '../store/actions';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';

export const useAppActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(ActionCreators, dispatch);
};
