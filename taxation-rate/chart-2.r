getwd()
setwd("/Users/deegee/Desktop/WorkArea/GitHub/DataViz/taxation-rate")
options(scipen=999) # turn off scientific notation like 1e+06

taxation_data <- read.csv("result.csv")
colnames(taxation_data) <- c('income','taxRate','taxAmount') #Adding headers

# Importing libraries
# install.packages('remotes')
# install.packages("plotly")

# remotes::install_github("clauswilke/ggtext")
library(ggplot2)
library(ggtext)
library(plotly)


# Color definitions
colorSepia <- "#fff1e5"

ggplot(data = taxation_data, aes(x=income/100000, y=income/100000)) +
  geom_line(aes(y=income/100000), colour = "DarkBlue") +
  geom_line(aes(y=taxRate), colour= "Brown") +
  scale_y_continuous(
    
    # Features of the first axis
    name = "Income (lakhs)",
    expand = expansion(mult = c(0, .05)), # This decides start of the y axis
    # Add a second axis and specify its features
    sec.axis = sec_axis(~.*1, name="Tax Rate (%)")
  ) + 
  labs(x="Income (lakhs)" ,
       y="Income (lakhs)",
       title = "Income And Tax Rate",
       subtitle = "New tax Regime - Income against tax rate (%)",
       caption = "Source - Github/dheepakg: data-stories/taxation-rate/chart.r"
       
  ) +
  theme(
    plot.title = element_text(face = "bold"),  
    plot.title.position = "panel",
    axis.line = element_line(colour = "black"),
    axis.title.y = element_text(color = "DarkBlue"),
    axis.title.y.right = element_text(color = "Brown"),
    plot.background = element_rect(fill = colorSepia),
    panel.background = element_rect(fill = colorSepia),
    panel.grid.minor.x = element_blank(),
    panel.grid.major.x = element_blank(),
    plot.caption = element_markdown()
  ) 

# ggplotly(p)

?ggplotly