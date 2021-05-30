import { _tables } from "../../models/interfaces/ITables";
import { _terms } from "../../models/interfaces/ITerms";
import { getTerms } from "../../services/terms";
import * as actionTypes from "./actionTypes";
import { Switch, Tooltip } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

export const termDataSuccess = (terms = _terms, total = 0, columns) => {
  return {
    type: actionTypes.TERM_DATA_SUCCESS,
    termsData: terms,
    total_elements: total,
    columns,
  };
};

export const termDataFail = (error) => {
  return {
    type: actionTypes.TERM_DATA_FAIL,
    error,
  };
};

export const fetchTermDataStart = () => {
  return { type: actionTypes.TERM_DATA_FETCH };
};

export const fetchTermData = (page = _tables.page) => {
  return (dispatch) => {
    dispatch(fetchTermDataStart());

    // set the columns of the table
    const columns = [
      {
        title: "Name",
        dataIndex: "label",
      },
      {
        title: "Synonyms",
        dataIndex: "synonyms",
      },
      {
        title: "Code",
        dataIndex: "obo_id",
      },
      {
        title: "Editor",
        dataIndex: "term_editor",
      },
      {
        title: "Children",
        dataIndex: "has_children",
        // set a switcher \disabled/
        render: (has_children) => (
          <Tooltip
            title={
              has_children
                ? "The term has children"
                : "The term has not children"
            }
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={has_children}
              disabled
            />
          </Tooltip>
        ),
      },
    ];

    getTerms(page.current, page.size)
      .then(({ data }) => {
        const terms = data._embedded.terms.map((term) => {
          return {
            key: term.obo_id,
            label: term.label,
            synonyms: term.synonyms ? term.synonyms.join(", ") : "-",
            obo_id: term.obo_id,
            term_editor: term.annotation["term editor"]
              ? term.annotation["term editor"].join(", ")
              : "-",
            has_children: term.has_children,
          };
        });

        dispatch(termDataSuccess(terms, data.page.totalElements, columns));
      })
      .catch((e) => dispatch(termDataFail(e)));
  };
};
