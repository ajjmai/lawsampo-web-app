import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SuggestionItem from './SuggestionItem';

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  return <SuggestionItem suggestion={suggestion} query={query} isHighlighted={isHighlighted} />;
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  container: {
    flexGrow: 0,
    position: 'relative',
    marginTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1500,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    maxHeight: 500,
    overflow: 'auto',
  },
});

const IntegrationAutosuggest = (props) => {

  let autosuggestDOM = React.createRef();

  const handleOnChange = (event, { newValue }) => {
    props.clearSuggestions();
    props.updateQuery(newValue);
  };

  const handleOnSuggestionSelected = () => {
    console.log('fetching results');
    props.fetchResults();
  };

  const handleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('fetching results');
      autosuggestDOM.current.input.blur();
      props.fetchResults();
    }
  };

  // const handleOnBlur = (event, { highlightedSuggestion }) => {
  //   // console.log(event);
  //   // console.log(highlightedSuggestion);
  // };

  const handleOnSuggestionsFetchRequested = ({ value }) => {
    if (props.search.suggestionsQuery != value ) {
      console.log('fetching suggestions');
      props.fetchSuggestions();
    }
    else {
      console.log('using old suggestions');
    }
  };

  const shouldRenderSuggestions = (value)  => {
    return value.trim().length > 2;
  };

  const handleOnSuggestionsClearRequested = () => {
    //console.log('SuggestionsClearRequested');
    //props.clearSuggestions();
  };

  const { classes } = props;
  //console.log('IntegrationAutosuggest', props.search.suggestions);

  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={props.search.suggestions}
      shouldRenderSuggestions={shouldRenderSuggestions}
      onSuggestionsFetchRequested={handleOnSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleOnSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={handleOnSuggestionSelected}
      focusInputOnSuggestionClick={false}
      ref={autosuggestDOM}
      inputProps={{
        classes,
        placeholder: 'Search place names',
        value: props.search.query,
        onChange: handleOnChange,
        onKeyDown: handleOnKeyDown,
        autoFocus: true
      }}
    />
  );
};

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  updateQuery: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
