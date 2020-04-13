import React, { Component } from "react"
import {Dimensions, StyleSheet} from "react-native"

import Block from "./Block";
import { theme } from "../constants";

export default class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [styles.card, style];

    return (
        <Block color={color || theme.colors.white} style={cardStyles} {...props}>
          {children}
        </Block>
    );
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.border,
    padding: theme.sizes.base + 4,
    marginBottom: theme.sizes.base,

  },
  shadow: {
    // shadowColor: '#000000',
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 5, height: 0 },
    // shadowRadius: 30
  }
});