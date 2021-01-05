import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from "@material-ui/core/Tooltip";
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const defaultExpandCellStyles = theme => ({
  rootNoText: {
    width: 30,
    paddingRight: 0,
    '& $expandContainer': {
      marginRight: 0,
      justifyContent: 'center',
    },
  },
  rootWithText: {
    width: 140,
  },
  fixedHeader: {
    position: 'sticky',
    top: '0px',
    left: '0px',
    zIndex: 100,
  },
  icon: {
    cursor: 'pointer',
    transition: 'transform 0.25s',
    fontSize: 18,
    marginLeft: 2,
  },
  expanded: {
    transform: 'rotate(90deg)',
  },
  hide: {
    visibility: 'hidden',
  },
  headerCell: {
    zIndex: 110,
    backgroundColor: theme.palette.background.paper,
  },
  checkboxRoot: {},
  disabled: {},
  expandContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  expandButton: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  expandText: {
    fontSize: 13,
    textTransform: 'none',
  },
});

class TableExpandCell extends React.Component {
  static propTypes = {
    /** Select cell part of fixed header */
    fixedHeader: PropTypes.bool.isRequired,
    /** Extend the style applied to components */
    classes: PropTypes.object,
    /** Is expandable option enabled */
    expandableOn: PropTypes.bool,
  };

  static defaultProps = {
    isHeaderCell: false,
    isRowExpanded: false,
    expandableOn: false,
    expandBtn: {}
  };

  render() {
    const {
      classes,
      className,
      fixedHeader,
      isHeaderCell,
      expandableOn,
      isRowExpanded,
      isRowExpandable,
      onExpand,
      expandBtn,
      hideText,
      row,
      dataIndex,
      rowIndex
    } = this.props;
    const { text = "Expand", tooltip, props, onClick: onExpandClick } = expandBtn;

    if (!expandableOn) return false;

    const cellClass = classNames({
      [classes.rootNoText]: hideText,
      [classes.rootWithText]: !hideText,
      [classes.fixedHeader]: fixedHeader,
      [classes.headerCell]: isHeaderCell,
      ...(className ? { [className]: true } : {}),
    });

    const iconClass = classNames({
      [classes.icon]: true,
      [classes.hide]: isHeaderCell,
      [classes.expanded]: isRowExpanded,
    });

    return (
      <TableCell className={cellClass} padding="checkbox">
        <div className={classes.expandContainer}>
          {expandableOn && !isHeaderCell && isRowExpandable && (
            <Button
              className={classes.expandButton}
              disableRipple
              onClick={(...p) => {
                onExpand(...p);
                if (typeof onExpandClick === "function") {
                  onExpandClick(row, { rowIndex, dataIndex }, this.props);
                }
              }}
              disabled={isHeaderCell}
              style={
                hideText
                  ? {
                      minWidth: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }
                  : {}
              }
              {...(typeof props === "function"
                ? props(row, { rowIndex, dataIndex })
                : props)}
            >
              {!hideText && (
                <Typography component="span" className={classes.expandText}>
                  {typeof text === "function" ? text(row, { rowIndex, dataIndex }) : text}
                </Typography>
              )}
              {tooltip ? (
                <Tooltip title={typeof tooltip === "function" ? tooltip(row, { rowIndex, dataIndex }) : tooltip}>
                  <KeyboardArrowRight id="expandable-button" size="small" className={iconClass} />
                </Tooltip>
              ) : (
                <KeyboardArrowRight id="expandable-button" size="small" className={iconClass} />
              )}
            </Button>
          )}
        </div>
      </TableCell>
    );
  }
}

export default withStyles(defaultExpandCellStyles, { name: 'MUIDataTableExpandCell' })(TableExpandCell);
