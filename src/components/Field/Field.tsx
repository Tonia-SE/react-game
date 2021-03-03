import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { For } from 'react-loops'

import { Cell } from '../Cell/Cell';
import { IndicatorPanel } from '../Indicators/IndicatorPanel';
import { LeftSideMenu } from '../SideMenu/LeftSideMenu';
import { ApplicationState } from '../../store/rootReducer';
import { Button } from 'react-bootstrap';
import { START_GAME } from '../../store/actionTypes';
import { RightSideMenu } from '../SideMenu/RightSideMenu';
import { btnSoundsPlayer } from '../../index'
import { getI18n, useTranslation } from 'react-i18next';

interface IMoveItem {
  value: number
  dest: Array<number>
  kind: string
}

export const Field: React.FC = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: ApplicationState) => state.game.isGameStarted);
  const isFullScreen = useSelector((state: ApplicationState) => state.game.isFullScreen);
  const field = useSelector((state: ApplicationState) => state.game.field);
  const moves = useSelector((state: ApplicationState) => state.game.moves);
  const direction = useSelector((state: ApplicationState) => state.game.directionOfLastMove);

  const theme = useSelector((state: ApplicationState) => state.settings.theme);
  const soundsVolume = useSelector((state: ApplicationState) => state.sounds.soundsVolume);
  const fieldClassName = isFullScreen ? "field-max": "field";
  btnSoundsPlayer.volume = soundsVolume;
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  
  useEffect(() => {
    getI18n().changeLanguage(language); 
  }, [language])

  if(!isGameStarted) {
    return (
      <div className="game-wrapper">
        <IndicatorPanel />
        <div className="field-wrapper">
        <LeftSideMenu />
        <div className={`${fieldClassName} bg-dark-${theme} border-color-${theme}`}>
          <div className="start-game">
            <Button className={`start-game-btn-${theme}`} onClick={() => {
                dispatch({type: START_GAME })
                btnSoundsPlayer.play();
              }}>
              {t('start game')}
            </Button>
          </div>
        </div>
        <RightSideMenu/>
        </div>
      </div>
    );
  } else{
    return (
      <div className="game-wrapper" >
        <IndicatorPanel />
        <div className="field-wrapper">
        <LeftSideMenu />
        {/* <TransitionGroup> */}
          <div className={`${fieldClassName} border-color-${theme}`} >  
          

          <For of={moves} as={(row:Array<IMoveItem>) =>
            <For of={row} as={(item:IMoveItem) =>
              <Cell value={item.value} moveClasses={''} key={Math.random()*1000}/>
            }/>
          }/>

            {/* {moves.map((row: Array<IMoveItem>) => {
              return row.map((value: IMoveItem) => {
                let moveClasses = ''
                if (value.kind !== 'none') {
                  switch(direction) {
                    case 'ArrowUp':
                      moveClasses = "up"
                      break
                    case 'ArrowDown':
                      moveClasses = "down"
                      break
                    case 'ArrowLeft':
                      moveClasses = "left"
                      break
                    case 'ArrowRight':      
                      moveClasses = "right"
                      break          
                    default:
                      break
                  }
                }

                return <Cell value={value.value} moveClasses={moveClasses} key={Math.random()*1000}/>
              })
            })} */}
          </div>
        {/* </TransitionGroup> */}
        <RightSideMenu/>
        </div>
      </div>
    );
  }
};


// class TodoList extends React.Component {
//    constructor(props) {
//      super(props)
//      this.state = {items: ['hello', 'world', 'click', 'me']}
//    }
//    handleAdd() {
//      const newItems = this.state.items.concat([
//        prompt('Enter some text')
//      ]);
//      this.setState({ items: newItems });
//    }
//    handleRemove(i) {
//      let newItems = this.state.items.slice();
//      newItems.splice(i, 1);
//      this.setState({items: newItems});
//    }
//    render() {
//      return (
//        <div>
//          <button onClick={() => this.handleAdd()}>Add Item</button>
//          <TransitionGroup>
//            {this.state.items.map((item, i) => (
//              <FadeTransition key={item}>
//                <div>
//                  {item}{' '}
//                  <button onClick={() => this.handleRemove(i)}>
//                    remove
//                  </button>
//                </div>
//              </FadeTransition>
//            ))}
//          </TransitionGroup>
//        </div>
//      );
//    }
// }
