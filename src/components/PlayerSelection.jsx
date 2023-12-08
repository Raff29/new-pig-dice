import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

const PlayerSection = ({ player, gameState }) => {
  return (
    <Box
      p="10"
      bg={useColorModeValue(
        gameState.activePlayer === player ? "gray.200" : "gray.300",
        gameState.activePlayer === player ? "gray.600" : "gray.700"
      )}
      rounded="md"
      shadow="lg"
    >
      <Center>
        <Heading size="lg">
          Player {player + 1}
          {gameState.activePlayer === player}
        </Heading>
        <ArrowDownIcon
          ml={2}
          boxSize="24px"
          color={
            gameState.activePlayer === player ? "green.500" : "transparent"
          }
        />
      </Center>

      <Center my="6">
        <Text fontSize="5xl">{gameState.scores[player]}</Text>
      </Center>

      <Box
        bg={useColorModeValue("teal.500", "teal.200")}
        p="2"
        rounded="md"
        shadow="md"
      >
        <Text fontSize="sm">Current</Text>
        <Center>
          <Text fontSize="2xl">
            {gameState.activePlayer === player ? gameState.roundScore : "-"}
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

PlayerSection.propTypes = {
  player: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    scores: PropTypes.arrayOf(PropTypes.number).isRequired,
    roundScore: PropTypes.number.isRequired,
    activePlayer: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    previousRoll: PropTypes.number,
    targetScore: PropTypes.number.isRequired,
    diceRoll: PropTypes.number,
  }).isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default PlayerSection;
