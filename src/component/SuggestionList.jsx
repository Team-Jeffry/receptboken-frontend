import React, { Component } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default class SuggestionList extends Component {
    render() {
        return (
            <div>
                {this.props.data.length !== 0 && (
                    <div className="suggestion-list">                        
                        <div className="container">
                            <Box sx={{ width: "100%", maxWidth: 360 }}>                                
                                    <List>
                                        {this.props.data.map((element) => {
                                            return (
                                                <ListItem disablePadding>
                                                    <ListItemButton>
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
