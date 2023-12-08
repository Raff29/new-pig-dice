import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import PlayerSection from "./PlayerSelection";

const PigDice = () => {
  const [gameState, setGameState] = useState({
    scores: [0, 0],
    roundScore: 0,
    activePlayer: 0,
    isPlaying: true,
    previousRoll: null,
    targetScore: 100,
    diceRoll: 1,
    winner: null,
  });

  const rollDice = () => {
    if (gameState.isPlaying) {
      const diceRoll = Math.floor(Math.random() * 6) + 1;

      if (diceRoll === 6 && gameState.previousRoll === 6) {
        setGameState((prevState) => ({
          ...prevState,
          scores: [0, 0],
          roundScore: 0,
          previousRoll: null,
          activePlayer: 1 - prevState.activePlayer,
          diceRoll,
        }));
      } else if (diceRoll === 1) {
        setGameState((prevState) => ({
          ...prevState,
          roundScore: 0,
          previousRoll: diceRoll,
          activePlayer: 1 - prevState.activePlayer,
          diceRoll,
        }));
      } else {
        setGameState((prevState) => ({
          ...prevState,
          roundScore: prevState.roundScore + diceRoll,
          previousRoll: diceRoll,
          diceRoll,
        }));
        if (gameState.scores[gameState.activePlayer] >= gameState.targetScore) {
          setGameState((prevState) => ({
            ...prevState,
            winner: gameState.activePlayer,
            isPlaying: false,
          }));
        }
      }
    }
  };

  const holdScore = () => {
    if (gameState.isPlaying) {
      const newScores = [...gameState.scores];
      newScores[gameState.activePlayer] += gameState.roundScore;
      if (newScores[gameState.activePlayer] >= gameState.targetScore) {
        setGameState((prevState) => ({
          ...prevState,
          scores: newScores,
          isPlaying: false,
          winner: prevState.activePlayer,
        }));
      } else {
        setGameState((prevState) => ({
          ...prevState,
          scores: newScores,
          roundScore: 0,
          previousRoll: null,
          activePlayer: 1 - prevState.activePlayer,
        }));
      }
    }
  };

  const newGame = () => {
    setGameState({
      scores: [0, 0],
      roundScore: 0,
      activePlayer: 0,
      isPlaying: true,
      previousRoll: null,
      targetScore: gameState.targetScore,
      winner: null,
    });
  };

  const changeTargetScore = (event) => {
    const newTargetScore = parseInt(event.target.value);
      setGameState((prevState) => ({
        ...prevState,
        targetScore: newTargetScore,
      }));
    }

  return (
    <Box
      d="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      minH="100vh"
      minW="100vw"
      pt="100"
      bg={useColorModeValue("gray.200", "gray.900")}
    >
      <Container
        maxW="container.md"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="xl"
        p="6"
        rounded="md"
      >
        <Center
          position="absolute"
          top="20%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          {gameState.winner !== null && (
            <Heading size="lg">Player {gameState.winner + 1} wins!</Heading>
          )}
        </Center>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "4", md: "12" }}
          my="10rem"
          align="center"
          justify="center"
        >
          {/* Player 1 Section */}
          <PlayerSection
            player={0}
            gameState={gameState}
            setGameState={setGameState}
          />

          {/* Dice and Target Score Section */}
          <VStack spacing={8}>
            <Box
              height="150px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputGroup size="sm">
                <Input
                  type="number"
                  placeholder="Target Score"
                  value={gameState.isPlaying ? gameState.targetScore : ""}
                  onChange={changeTargetScore}
                  disabled={!gameState.isPlaying}
                  width="4rem"
                />
                <InputRightAddon children="Score" />
              </InputGroup>
              {gameState.isPlaying && gameState.diceRoll !== undefined && (
                <Box boxSize="100" shadow="dark-lg">
                  <img
                    src={`./assets/dice-${gameState.diceRoll}.png`}
                    alt="Dice"
                  />
                </Box>
              )}
            </Box>
          </VStack>

          {/* Player 2 Section */}
          <PlayerSection
            player={1}
            gameState={gameState}
            setGameState={setGameState}
          />
        </Stack>

        <Center mt="6">
          <Stack direction={{ base: "column", md: "row" }} spacing="4">
            <Button
              colorScheme="teal"
              onClick={rollDice}
              disabled={!gameState.isPlaying}
            >
              Roll dice
            </Button>
            <Button colorScheme="teal" onClick={newGame}>
              New game
            </Button>
            <Button
              colorScheme="teal"
              onClick={holdScore}
              disabled={!gameState.isPlaying}
            >
              Hold
            </Button>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

export default PigDice;
