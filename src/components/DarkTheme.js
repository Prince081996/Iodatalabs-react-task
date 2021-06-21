

import React,{ useState} from 'react'
import TodoLists from "./TodoLists";

function DarkTheme() {
    const [theme, setTheme] = useState({
        palette: {
          type: "light"
        }
      });
    
      // we change the palette type of the theme in state
      const toggleDarkTheme = () => {
        alert("test")
        let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
        setTheme({
          palette: {
            type: newPaletteType
          }
        });
      };
      const muiTheme = createMuiTheme(theme);
      
    return (
        <div>
            <MuiThemeProvider theme={muiTheme}>
                <TodoLists onToggleDark={toggleDarkTheme} />
            </MuiThemeProvider>
        </div>
    )
}

export default DarkTheme
