import React, { Component } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ShowRecipe from "./ShowRecipe";

const listStyle = {
    display: "flex",
    justifyContent: "center",
};

export default class SuggestionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShowHide: false,
            renderedElement: undefined,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (elementName) => {
        this.setState({ renderedElement: elementName, modalShowHide: !this.state.modalShowHide });
    };

    render() {
        return (
            <div>
                {this.props.data.length !== 0 && (
                    <div className="suggestion-list">
                        <div style={listStyle}>
                            <Box sx={{ width: "100%", maxWidth: 360 }}>
                                <List>
                                    {this.props.data.map((element) => {
                                        return (
                                            <ListItem
                                                key={element.name}
                                                disablePadding
                                                style={{ backgroundColor: "whitesmoke", borderRadius: "8px", marginBottom: "6px" }}
                                            >
                                                <ListItemButton onClick={() => this.handleClick(element.name)}>
                                                    <ShowRecipe
                                                        showHide={this.state.renderedElement === element.name && this.state.modalShowHide}
                                                        recipe={element}
                                                    />
                                                    <ListItemText primary={element.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
